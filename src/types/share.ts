export type Tag = string;

export interface TagItem {
  count: number;
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  name: Tag;
}

export type TagList = Tag[]