import { apiHelper } from "@/utils/helpers";

const tagCount = 10
const questionCount = 20

export default {
  getTopTags() {
    return apiHelper.get('/tags', {
      params: {
        pagesize: tagCount,
        order: 'desc',
        sort: 'popular',
        site: 'stackoverflow'
      }
    })
  },
  getQeustionsByTag(tag: string) {
    return apiHelper.get('/questions', {
      params: {
        pagesize: questionCount,
        order: 'desc',
        sort: 'vote',
        tagged: tag,
        site: 'stackoverflow'
      }
    })
  }
}