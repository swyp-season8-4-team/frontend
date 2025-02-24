import { useState } from 'react';

export const useTag = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [isMyPreferSelected, setIsMyPreferSelected] = useState(false);

  const updateSelectedTag = (category: string) => {
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

  const handleMyPreferenceTagClick = (userPreferences: string[]) => {
    setSelectedCategories(() => {
      const newSet = new Set([...userPreferences]);
      return newSet;
    });
    setIsMyPreferSelected(true);
  };

  return {
    selectedCategories,
    isMyPreferSelected,
    updateSelectedTag,
    handleMyPreferenceTagClick,
  };
};
