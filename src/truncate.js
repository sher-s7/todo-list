const truncate = (input, length, amount) => input.length > length ? `${input.substring(0, amount)}...` : input;

export {truncate}