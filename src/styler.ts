import { computed } from "vue";

export const styler = {
    writeNumber: function (a: number) {
        if (a < 10) {
            return a.toLocaleString(undefined, { minimumSignificantDigits: 2, maximumSignificantDigits: 2 });
        }
        return (a.toLocaleString(undefined, { maximumFractionDigits: 0 }));
    },

    endInt: function (a: number) {
        let t = this.writeNumber(a);
        if (a % 1 != 0) {
            return t;
        }
        switch (a % 10) {
            case 1:
                return a + "st";
            case 2:
                return a + "nd";
            case 3:
                return a + "rd";
            default:
                return a + "th";
        }
    }
}