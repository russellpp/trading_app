import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

function CoinChart({ data }) {
  const minPrice = Math.min(...data.map((d) => d.price));
  const maxPrice = Math.max(...data.map((d) => d.price));
  const priceRange = maxPrice - minPrice;

  return (
    <LineChart
      width={1000}
      height={400}
      data={data}
      zoom={{ enabled: true, mode: "x" }}
      la
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="time"
        tick={{ fontSize: 10, fill: "#aca9a9ac" }}
        tickFormatter={(tick) =>
          new Date(tick).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        }
        interval={23}
      />
      <YAxis
        domain={[
          minPrice - priceRange * 0.1, // set 10% padding below min value
          maxPrice + priceRange * 0.1, // set 10% padding above max value
        ]}
        tickFormatter={(tick) =>
          tick.toLocaleString(undefined, {
            minimumSignificantDigits: 1,
            maximumSignificantDigits: 3,
            style: "currency",
            currency: "USD",
          })
        }
        tick={[minPrice, "", maxPrice]}
        tickCount={3}
      />
      <Tooltip
        formatter={(value) =>
          value.toLocaleString(undefined, {
            minimumSignificantDigits: 1,
            maximumSignificantDigits: 5,
            style: "currency",
            currency: "USD",
          })
        }
        labelFormatter={(time) =>
          `${new Date(time).toLocaleTimeString([], {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}`
        }
        contentStyle={{
          backgroundColor: "#ababc4",
          border: "none",
          borderRadius: "10px",
          color: "#333",
        }}
      />
      <Line
        type="monotone"
        dataKey="price"
        stroke="#f0f757"
        activeDot={{ r: 8, fill: 'var(--blush)'}}
        strokeWidth={3}
        dot={false}
      />
      <ReferenceLine
        x={new Date().setHours(0, 0, 0, 0)}
        stroke="red"
        label="12am"
      />
    </LineChart>
  );
}

export default CoinChart;
