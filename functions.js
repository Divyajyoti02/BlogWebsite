function truncateString(text, numChars) {
    if (text.length <= numChars) return text;
    return text.substr(0, text.lastIndexOf(' ', numChars)) + "...";
}

function dateDiff(date1, date2) {
    return Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
}

function whenPosted(timeNow, timePosted) {
    var date2 = structuredClone(timeNow);
    var date1 = structuredClone(timePosted);
    date2.setHours(0,0,0,0);
    date1.setHours(0,0,0,0);
    var diff = dateDiff(date1, date2);
    if (diff === 0) {return "Today";}
    else if (diff == 1) {return "Yesterday";}
    else {return `${diff} days ago`;}
}

class Blog {
    constructor(title, desc, time) {
        this.title = title;
        this.desc = desc;
        this.time = time;
    }
}

class ArrElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class SortedArray {
    constructor() {
        this.list = [];
        this.simpleList = [];
    }

    add(elem) {
        var listLength = this.list.length;
        if (listLength === 0 || elem.priority - this.list[0].priority >= 0) {
            this.list.splice(0, 0, elem);
        } else if (
            listLength > 0 &&
            elem.priority - this.list[listLength - 1].priority <= 0
        ) {array.splice(listLength, 0, elem);}
        var left = 0, right = listLength;
        var leftLast = 0, rightLast = right;
        while (left < right) {
            var inPos = Math.floor((right + left) / 2);
            var compared = elem.priority - this.list[inPos].priority;
            if (compared < 0) {left = inPos;} else if (compared > 0) {
                right = inPos;
            } else {
                right = inPos;
                left = inPos;
            }
            if (leftLast === left && rightLast === right) {
                break;
            }
            leftLast = left;
            rightLast = right;
        }
        this.list.splice(right, 0, elem);
        this.simpleList.splice(right, 0, elem.element);
    }

    remove(idx) {
        this.list.splice(idx, 1);
        this.simpleList.splice(idx, 1);
    }
}

class BlogList {
    constructor() {
        this.list = new SortedArray();
    }
    
    add(blog) {
        this.list.add(new ArrElement(blog, blog.time));
    }

    remove(idx) {
        return this.list.remove(idx);
    }

    getList() {
        return this.list.simpleList;
    }
}

var exportObj = {
    functions: {
        truncateString: truncateString,
        whenPosted: whenPosted
    }, classes: {
        Blog: Blog,
        BlogList: BlogList
    }
};

export default exportObj;