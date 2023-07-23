export const format = (value: number) => {
	const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    });

	return formatter.format(value);
};
