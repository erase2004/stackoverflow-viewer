import { apiHelper } from "@/utils/helpers";
import { TagList } from '@/types/share'
import { TAG_SEPERATOR } from "@/constants/share";

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
  getQeustionsByTag(tagList: TagList, page: number) {
    return apiHelper.get('/questions', {
      params: {
        page,
        pagesize: questionCount,
        order: 'desc',
        sort: 'votes',
        tagged: tagList.join(TAG_SEPERATOR),
        site: 'stackoverflow'
      }
    })
  }
}