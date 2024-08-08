import { Octokit } from 'octokit'
import { pipeline } from "node:stream/promises";
import fs from "node:fs";
import * as tar from 'tar'
import dotenv from 'dotenv';

dotenv.config();

const githubtoken = process.env.githubtoken;
const owner = 'BSTN'
const repo = 'widt-retoriek-content'
const dir = `./repos/${owner}-${repo}`

const octokit = new Octokit({ auth: githubtoken })

const { data } = await octokit.request('GET /repos/{owner}/{repo}/tarball/{ref}', {
  request: {
    parseSuccessResponseBody: false
  },
  owner: 'BSTN',
  repo: 'widt-retoriek-content'
});

if (fs.existsSync(dir)) {
  await fs.rm(dir, { recursive: true, force: true }).catch(err => {
    throw Error(`Could not delete existing directory for github repository ${owner}/${repo}.`)
  })
}

await fs.mkdir(dir).catch(err => {
  throw Error(`Could not create directory for github repository ${owner}/${repo}.`)
})

await pipeline(data, fs.createWriteStream("./repo.tar"));

await tar.x({f: './repo.tar', C: dir, strip: 1})

fs.rmSync('./repo.tar')

const info = await octokit.rest.repos.getCommit({
  owner,
  repo,
});
console.log(info.data[0].sha, info.data[0].author.login)
