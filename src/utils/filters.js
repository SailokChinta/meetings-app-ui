export const formatDate = ( ISODate ) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      const date = new Date( ISODate );
      return `${months[date.getMonth()]} ${date.getDay()+1}, ${date.getFullYear()}`;
};

export const formatTime = ( time ) => {
    let timeMap = [];

    for( let i = 0; i < 9; i++ ) {
        timeMap.push( `0${i}` );
    }

    for (let i = 10; i < 61; i++) {
        timeMap.push( i );       
    }

    return timeMap[ time ];
}