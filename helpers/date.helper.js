const getSlugCurrentTime = () => {
    const time = new Date();
    const year = time.getFullYear();
    const month = (time.getMonth() + 1 > 9) ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
    const date = (time.getDate() > 9) ? time.getDate() : '0' + time.getDate();
    const hours = (time.getHours() > 9) ? time.getHours() : '0' + time.getHours();
    const minutes = (time.getMinutes() > 9) ? time.getMinutes() : '0' + time.getMinutes();
    const seconds = (time.getSeconds() > 9) ? time.getSeconds() : '0' + time.getSeconds();
    let milliseconds = Math.round(time.getMilliseconds() / 10);
    milliseconds = (milliseconds > 9) ? milliseconds : '0' + milliseconds;

    return `${year}` + `${month}` + `${date}` + `${hours}` + `${minutes}` + `${seconds}` + `${milliseconds}`;
};

module.exports = { getSlugCurrentTime };