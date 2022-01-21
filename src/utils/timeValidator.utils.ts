export const timeValidatorUtil = async (time_of_departure): Promise<boolean> => {
  try {
    time_of_departure = new Date(time_of_departure).getTime()
    let time_of_cancellation = new Date().getTime()

    let time_difference = time_of_departure / 1000 - time_of_cancellation / 1000

    if (time_difference < 3600) {
      return false
    }
    return true
  } catch (err) {
    err.statusCode = 500
    return err.message
  }
}
