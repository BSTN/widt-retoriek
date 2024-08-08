import { defineNuxtModule } from '@nuxt/kit'
import { Octokit } from 'octokit'
import { pipeline } from "node:stream/promises";
import fs from "fs";
import * as tar from 'tar'
import dotenv from 'dotenv';
dotenv.config();

console.log(`Using local github folder: ${process.env.githubtoken}`)

async function getRepo({ owner, repo, local }: { owner: string, repo: string, local: string }) {

  // do nothing if local folder is used
  if (local && process.env.local) {
    console.log(`Using local github folder: ${local}`)
    return
  }
  
  const githubtoken = process.env.githubtoken || process.env.GITHUBTOKEN;
  const rootdir = `./repos`
  const dir = `${rootdir}/${owner}-${repo}`
  const infoPath = `${dir}/.info`
  const octokit = new Octokit({ auth: githubtoken })

  // check if update is needed
  console.log('----- check if update is needed -----')
  const info = await octokit.rest.repos.getCommit({ owner, repo });

  if (fs.existsSync(infoPath)) {
    const { hash } = JSON.parse(fs.readFileSync(infoPath, 'utf8'))
    if (info?.data && hash === String(info.data[0].sha)) {
      console.log(`No update needed (${hash})`)
      return
    }
  }
  
  // prepare directory
  if (!fs.existsSync(rootdir)) {
    try {
      fs.mkdirSync(rootdir)
    }
    catch (err) {
      console.warn(err)
      throw Error(`Could not create repos directoy for github repository ${owner}/${repo}.`)
    }
  }
  if (fs.existsSync(dir)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true })
    } 
    catch(err){
      console.warn(err)
      throw Error(`Could not delete existing directory for github repository ${owner}/${repo}.`)
    }
  }
  
  try {
    fs.mkdirSync(dir)
  }
  catch (err){
    console.warn(err)
    throw Error(`Could not create directory ${dir} for github repository ${owner}/${repo}.`)
  }

  console.log(`Start download ${owner}/${repo}...`)
  // fetch content
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/tarball/{ref}', { request: { parseSuccessResponseBody: false }, owner, repo});
  await pipeline(data, fs.createWriteStream("./repo.tar"));

  await tar.x({f: './repo.tar', C: dir, strip: 1})

  fs.rmSync('./repo.tar')

  fs.writeFileSync(infoPath, JSON.stringify({
    hash: info.data[0].sha,
    author: info.data[0].author.login
  }), 'utf8')
  
  console.log(`Done (${info.data[0].sha})`)
}

export default defineNuxtModule({
  meta: {
    // Usually the npm package name of your module
    name: 'github module',
    // The key in `nuxt.config` that holds your module options
    configKey: 'github',
    // Compatibility constraints
    compatibility: {
      // Semver version of supported nuxt versions
      nuxt: '>=3.0.0'
    }
  },
  // Default configuration options for your module, can also be a function returning those
  defaults: {},
  // Shorthand sugar to register Nuxt hooks
  hooks: {
    // "build:before": 
  },
  // The function holding your module logic, it can be asynchronous
  setup(moduleOptions, nuxt) {
    // ...
    nuxt.hook('build:before', async () => {
      // check if github options are defined
      if (!('github' in nuxt.options) || !nuxt.options.github || !Array.isArray(nuxt.options.github)) return
      // check if .env githubtoken exists
      if (!process.env.githubtoken) return
      // loop through repositories
      for (let i in nuxt.options.github) {
        await getRepo(nuxt.options.github[i])
      }
    })
  }
})