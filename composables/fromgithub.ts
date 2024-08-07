import { createStorage } from 'unstorage'
import githubDriver from "unstorage/drivers/github";

const storage = createStorage({
  driver: githubDriver({
    repo: "BSTN/widt-retoriek-content",
    branch: "main",
  }),
});
export const useFromgithub = (query:string) => {
  return useAsyncData(query, async () => {
    return storage.getItem(query)
  })
}
