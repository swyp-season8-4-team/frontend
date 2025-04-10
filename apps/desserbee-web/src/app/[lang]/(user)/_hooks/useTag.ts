import type { Preference } from '@repo/entity/src/preference';
import { useState } from 'react';

export const useTag = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<Preference>>(
    new Set(),
  );
  const [isMyPreferSelected, setIsMyPreferSelected] = useState(false);

  const updateSelectedTag = (categoryName: Preference) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
    setIsMyPreferSelected(false);
  };

  const handleMyPreferenceTagClick = (userPreferences: Preference[]) => {
    setIsMyPreferSelected((prev) => {
      const newValue = !prev;

      setSelectedCategories(() => {
        if (newValue) {
          return new Set([...userPreferences]);
        } else {
          return new Set();
        }
      });

      return newValue;
    });
  };

  const clearSelectedCategories = () => {
    setIsMyPreferSelected(false);
    setSelectedCategories(new Set());
  };

  return {
    selectedCategories,
    isMyPreferSelected,
    updateSelectedTag,
    handleMyPreferenceTagClick,
    clearSelectedCategories,
    selectedPreferenceTags: Array.from(selectedCategories),
  };
};
