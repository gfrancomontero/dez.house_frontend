// utils.ts

// Function to capitalize the first letter of each word in a string
export function titleizeWords(str: string): string {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

// Function to add delimiters to a numeric string
export const addDelimiters = (value: number | string, delimiter: string = '.'): string => {
  const numberWithDelimiter = value.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
  return numberWithDelimiter;
}

// Function to format numbers into thousands or millions with custom delimiters
export const thousandsOrMillions = (value: number, delimiter: string = '.'): string => {
  if (typeof value !== 'number' || isNaN(value)) {
    return 'N/A';
  }

  const formatNumber = (number: number, precision: number): string => {
    const fixedNumber = number.toFixed(precision);
    return fixedNumber.replace(/(?:\.0+|(\.\d+?)0+)$/, '$1');
  };

  if (value >= 1000000) {
    const millions = formatNumber(value / 1000000, 2);
    return millions.replace('.', delimiter) + ' m';
  } else if (value >= 10000) {
    const thousands = formatNumber(value / 1000, 0);
    return thousands.replace('.', delimiter) + ' k';
  } else if (value >= 1000) {
    const thousands = formatNumber(value / 1000, 1);
    return thousands.replace('.', delimiter) + ' k';
  } else {
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
};

// Data structure definition for house data
interface HouseData {
  for_sale_price: number;
  for_rent_price_monthly: number;
  property_type: string;
  plot_sqm?: number;
  built_sqm?: number;
  bedrooms: number;
  bathrooms: number;
}
