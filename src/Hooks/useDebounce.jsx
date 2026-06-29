// hooks/useDebounce.js
import { useEffect, useState } from 'react';


//   Custom Hook برای دیبونس کردن مقدار
//   @param {any} value - مقداری که میخواهیم دیبونس کنیم
//   @param {number} delay - تاخیر به میلی‌ثانیه (پیش‌فرض: 300)
//   @returns {any} - مقدار دیبونس شده
 
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // تنظیم تایمر برای به‌روزرسانی مقدار دیبونس شده
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // پاک‌سازی تایمر در صورت تغییر value یا delay
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}