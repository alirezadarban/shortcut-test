const globalValues = {
  response: (
    success: boolean = true,
    result: any = {},
    status: number,
  ) => {
    return {
      success,
      result,
      status,
    };
  }
};

export default globalValues;