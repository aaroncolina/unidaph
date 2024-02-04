import { Tag } from '@/types';
import { LabelValue } from '@/types/generic';

export const parseTagsToLabelValue = <T>(tags: Tag<T>[]) => {
  if (tags.length === 0) return [];
  return tags?.map((tag) => {
    return {
      label: tag.value,
      value: tag.id
    } as LabelValue;
  });
};

export const extractTagIds = <T>(tags?: Tag<T>[]) => {
  return tags?.map((tag) => tag.id);
};
