export const timeAgo = postDate => {

    let now = new Date();
    let post = new Date(postDate);

    const MIN = 60 * 1000;
    const HOUR = MIN * 60;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const LIMITE_WEEK = WEEK * 4;


    const difference = now - postDate;

    if (difference < MIN) {
         return Math.round(difference/1000) + ' seconds ago';   
    }

    else if (difference < HOUR) {
         return Math.round(difference/MIN) + ' minutes ago';   
    }

    else if (difference < DAY ) {
         return Math.round(difference/HOUR ) + ' hours ago';   
    }

    else if (difference < WEEK) {
        return Math.round(difference/DAY) + ' days ago';   
    }

    else if (difference < LIMITE_WEEK) {
        return  Math.round(difference/WEEK) + ' weeks ago';   
    }

    else {
        return post.toLocaleDateString();   
    }
}