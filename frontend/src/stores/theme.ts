import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
  }),
  actions: {
    toggleDark() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setDark(value: boolean) {
      this.isDark = value;
      if (this.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },
});
