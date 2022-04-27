import { apiHelper } from "@/utils/helpers";
import { TagList } from '@/types/share'

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
  getQeustionsByTag(tagList: TagList) {
    return apiHelper.get('/questions', {
      params: {
        pagesize: questionCount,
        order: 'desc',
        sort: 'votes',
        tagged: tagList.join(';'),
        site: 'stackoverflow'
      }
    })
  }
}