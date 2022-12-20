export const getErrorsMessage = (errorsObject): string => {
    const messagesArr = [];
    const keys = Object.keys(errorsObject);

    keys.forEach( prop =>  messagesArr.push(errorsObject[prop].msg));

    return messagesArr.join(' ');
  }