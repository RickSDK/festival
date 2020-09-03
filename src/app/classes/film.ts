declare var dateComponentFromDateStamp: any;

export class Film {
    public id: number;
    public user_id: number;
    public name: string;
    public url: string;
    public posterFlg: boolean;
    public trailorUrl: string;
    public releaseDate: string;
    public synopsis: string;
    public genre: string;
    public rating: string;
    public director: string;
    public producer: string;
    public cast: string;
    public crew: string;
    public created: string;
    public localDate: string;
    public dateStr: string;
    public trailerEmbed: string;
    public videoCode: number;
    public trailerCode: number;
    public stars: number;
    public numReviews: number;
    public likePercent: number;
    public starTitle: string;
    public reviewsTitle: string;
    public tagline: string;
    public lengthMinutes: number;
    public castList: any;
    public crewList: any;
    public bestReview: number;
    public likeString: string;
    public likeList: any;
    public releaseDateText: string;
    public behindScenes: string;
    public urlEmbed: string;

    constructor(line: string) {
        var components = line.split("|");
        if (components.length > 9) {
            var x = 0;
            this.id = Number(components[x++]);
            this.user_id = Number(components[x++]);
            this.name = components[x++];
            this.genre = components[x++];
            this.director = components[x++];
            this.releaseDate = components[x++];
            this.stars = Number(components[x++]);
            this.numReviews = Number(components[x++]);
            this.likePercent = Number(components[x++]);
            this.lengthMinutes = Number(components[x++]);
            x++;
            x++;
            x++;
            this.url = components[x++];
            this.posterFlg = (components[x++] == 'Y');
            this.trailorUrl = components[x++];
            this.synopsis = components[x++];
            this.rating = components[x++];
            this.producer = components[x++];
            this.cast = components[x++];
            this.crew = components[x++];
            this.created = components[x++];
            this.trailerEmbed = components[x++];
            this.tagline = components[x++];
            var castCrew = components[x++];
            this.bestReview = Number(components[x++]);
            this.likeString = components[x++];
            this.releaseDateText = components[x++];
            this.behindScenes = components[x++];

            var likeList = [];
            if (this.likeString && this.likeString.length > 0) {
                var list = this.likeString.split(':');
                list.forEach(record => {
                    var c = record.split('a');
                    likeList.push({ review_id: c[0], likeFlg: c[1] })
                });
            }
            this.likeList = likeList;


            if (castCrew && castCrew.length > 0) {
                var castList = [];
                var crewList = [];
                var peopleLines = castCrew.split('<a>');
                peopleLines.forEach(item => {
                    var c = item.split(':');
                    if (c.length > 3) {
                        var obj = { id: c[0], name: c[1], role: c[2], title: c[1], value: c[2], castFlg: (c[3] == 'Y') };
                        if (obj.castFlg) {
                            castList.push(obj);
                        }
                        else {
                            obj.title = c[2];
                            obj.value = c[1];
                            crewList.push(obj);
                        }
                    }
                });
                this.castList = castList;
                this.crewList = crewList;
            }

            this.starTitle = '1 Star';
            if (this.stars === 3)
                this.starTitle = '1.5 Star';
            if (this.stars === 4)
                this.starTitle = '2 Stars';
            if (this.stars === 5)
                this.starTitle = '2.5 Stars';
            if (this.stars === 6)
                this.starTitle = '3 Stars';
            if (this.stars === 7)
                this.starTitle = '3.5 Stars';
            if (this.stars === 8)
                this.starTitle = '4 Stars';

            this.reviewsTitle = (this.numReviews == 1) ? '1 Review' : this.numReviews + ' Reviews';
            if (this.url)
                this.videoCode = codeOfString(this.url);
            if (this.trailorUrl)
                this.trailerCode = codeOfString(this.trailorUrl);
            this.localDate = this.releaseDateText || dateComponentFromDateStamp(this.releaseDate, false, true);
            let parts = this.releaseDate.split(' ');
            if (parts.length > 1)
                this.releaseDate = parts[0];

            if (this.videoCode == 1) {
                var c = this.url.split('&');
                this.urlEmbed = c[0].replace('watch?v=', 'embed/');
            }

        }
    }
}


function codeOfString(str: string) {
    if (str.includes('youtu'))
        return 1;
    if (str.includes('vimeo'))
        return 2;
    if (str.includes('amazon'))
        return 3;

    return 0;
}