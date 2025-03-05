import { useState } from 'react';

export const useTag = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(
    new Set(),
  );
  const [isMyPreferSelected, setIsMyPreferSelected] = useState(false);

  const updateSelectedTag = (category: number) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
    setIsMyPreferSelected(false);
  };

  const handleMyPreferenceTagClick = (userPreferences: number[]) => {
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
