/**
 * Calculates and returns other wage values from hourly pay
 * @param hourlyPay
 * @param hoursPerWeek
 * @returns {{monthly: number, hourly, yearly: number, weekly: number}}
 */
export const calculateFromHourlyPay = (hourlyPay, hoursPerWeek) => {
    const weekly = (hourlyPay * hoursPerWeek);
    const monthly = weekly * 52 / 12;
    const yearly = weekly * 52;

    // Format values
    return {
        hourly: formatCurrency(hourlyPay),
        weekly: formatCurrency(weekly),
        monthly: formatCurrency(monthly),
        yearly: formatCurrency(yearly)
    }
}

/**
 * Calculates and returns other wage values from weekly pay
 * @param weeklyPay
 * @param hoursPerWeek
 * @returns {{monthly: number, hourly: number, yearly: number, weekly}}
 */
export const calculateFromWeeklyPay = (weeklyPay, hoursPerWeek) => {
    const hourly = weeklyPay / hoursPerWeek;
    const monthly = weeklyPay * 52 / 12;
    const yearly = weeklyPay * 52;

    return {
        hourly: formatCurrency(hourly),
        weekly: formatCurrency(weeklyPay),
        monthly: formatCurrency(monthly),
        yearly: formatCurrency(yearly)
    }
}

/**
 * Calculates and returns other wage values from monthly pay
 * @param monthlyPay
 * @param hoursPerWeek
 * @returns {{monthly, hourly: number, yearly: number, weekly: number}}
 */
export const calculateFromMonthlyPay = (monthlyPay, hoursPerWeek) => {
    const weekly = monthlyPay / (52 / 12);
    const hourly = weekly / hoursPerWeek;
    const yearly = monthlyPay * 12;

    return {
        hourly: formatCurrency(hourly),
        weekly: formatCurrency(weekly),
        monthly: formatCurrency(monthlyPay),
        yearly: formatCurrency(yearly)
    }
}

/**
 * Calculates and returns other wage values from yearly pay
 * @param yearlyPay
 * @param hoursPerWeek
 * @returns {{monthly: number, hourly: number, yearly, weekly: number}}
 */
export const calculateFromYearlyPay = (yearlyPay, hoursPerWeek) => {
    const monthly = yearlyPay / 12;
    const weekly = monthly / (52 / 12);
    const hourly = weekly / hoursPerWeek;

    return {
        hourly: formatCurrency(hourly),
        weekly: formatCurrency(weekly),
        monthly: formatCurrency(monthly),
        yearly: formatCurrency(yearlyPay)
    }
}

/**
 * Rounds a currency value to two decimal places, or none if it is whole
 * @param value
 * @returns {string}
 */
export const formatCurrency = value => {
    const roundedValue = Math.round(value * 100) / 100;

    // If value has pence, format appropriately
    const formatOptions = value % 1 ? {minimumFractionDigits: 2, maximumFractionDigits: 2} : {};
    return roundedValue.toLocaleString('en-GB', formatOptions);
}
