export class Review {
    public id: number;
    public user_id: number;
    public film_id: number;
    public thumbsUp: number;
    public stars: number;
    public likes: number;
    public dislikes: number;
    public flagged: boolean;
    public officialFlg: boolean;
    public name: string;
    public reviewLike: string;
    public reviewDislike: string;
    public created: string;
    public reviewLines1: any;
    public reviewLines2: any;
    public starTitle: string;
    public isMineFlg: boolean;

    constructor(line: string) {
        var components = line.split("|");
        if (components.length > 12) {
            var x = 0;
            this.id = parseInt(components[x++]);
            this.user_id = parseInt(components[x++]);
            this.film_id = parseInt(components[x++]);
            this.thumbsUp = parseInt(components[x++]);
            this.stars = parseInt(components[x++]);
            this.likes = Number(components[x++]);
            this.dislikes = Number(components[x++]);
            this.flagged = components[x++] == 'Y';
            this.officialFlg = components[x++] == 'Y';
            this.name = components[x++];
            this.reviewLike = components[x++].replace(/\[nl\]/g, '\n');
            this.reviewDislike = components[x++].replace(/\[nl\]/g, '\n');
            this.reviewLines1 = this.reviewLike.split('\n\n');
            this.reviewLines2 = this.reviewDislike.split('\n\n');
            this.created = components[x++];
            this.isMineFlg = false;

            this.starTitle = '1 Star';
            if (this.stars > 2)
                this.starTitle = (this.stars / 2).toString() + ' Stars';
        }
    }
}
