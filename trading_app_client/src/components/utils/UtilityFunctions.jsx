export const formatChartData = (prices) => {
  const chartData = prices.map((price, index) => {
    return {
      time: price[0],
      price: price[1],
    };
  });
  return chartData;
};

export const formatBigNumber = (value) => {
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  } else {
    return `$${value}`;
  }
};

export const formatPrice = (price) => {
  const formattedPrice = price.toLocaleString(undefined, {
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 8,
    style: "currency",
    currency: "USD",
  });
  return formattedPrice;
};

export const formatPriceInput = (price) => {
  const formattedPrice = price.toLocaleString(undefined, {
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 8,
  });
  return formattedPrice;
};

export const roundToSixSignificantFigures = (num) => {
  if (num === 0) {
    return 0;
  }
  const d = Math.ceil(Math.log10(Math.abs(num)));
  const power = 6 - d;
  const magnitude = Math.pow(10, power);
  const shifted = Math.round(num * magnitude);
  return shifted / magnitude;
};
