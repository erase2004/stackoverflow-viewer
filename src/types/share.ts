export type Tag = string;

export interface TagItem {
  count: number;
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  name: Tag;
}

export type TagList = Tag[]

export type Search = string;

export interface Owner {
  accept_rate: number;
  account_id: number;
  display_name: string;
  link: string;
  profile_image: string;
  reputation: number;
  user_id: number;
  user_type: string;
}
1
export interface Question {
  accepted_answer_id: number;
  answer_count: number;
  content_license: string;
  creation_date: number;
  is_answered: boolean;
  last_activity_date: number;
  last_edit_date: number;
  link: string;
  owner: Owner;
  protected_date: number;
  question_id: number;
  score: number;
  tags: TagList;
  title: string;
  view_count: number;
}