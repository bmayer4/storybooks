
const moment = require('moment');

const truncate = (str, len) => {
    if (str.length > len && str.length > 0) {
        let newString = str.substr(0, len);  //substr() second arg is amount of characers, and substring() second is end index (exclusive)
        newString = str.substr(0, newString.lastIndexOf(' ')); //so doesn't cut off mid sentence
        newString = (newString.length > 0) ? newString : str.substr(0, len);  //in case word never had spaces
        return newString + '...';
    }
    return str;
};

const stripTags = (input) => {
    return input.replace(/<(?:.|\n)*?>/gm, '');
};

const formatDate = (date, format) => {
    return moment(date).format(format);
};

const select = (selected, options) => {
    return options.fn(this).replace( new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"')
    .replace( new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
};

const editIcon = (storyUser, loggedUser, storyId, floating = true) => {
    if (storyUser === loggedUser) {
        if (floating) {
            return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`
        } else {
            return `<a href="/stories/edit/${storyId}"><i class="fa fa-pencil"></i></a>`
        }
    } else {
        return '';
    }
};

module.exports = {
   truncate: truncate,
   stripTags: stripTags,
   formatDate: formatDate,
   select: select,
   editIcon: editIcon
};