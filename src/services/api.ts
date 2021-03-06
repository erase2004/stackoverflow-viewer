import { apiHelper } from "@/utils/helpers";
import { TagList } from '@/types/share'
import { TAG_SEPERATOR } from "@/constants/share";

const tagCount = 10
const questionCount = 20
const key = '31L5Ys8JXOvMtuhz87xJQw(('

export default {
  getTopTags() {
    return apiHelper.get('/tags', {
      params: {
        key,
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
        key,
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