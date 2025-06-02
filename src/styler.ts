import { computed } from "vue";

export const styler = {
    writeNumber: function (a: number) {
        if (a < 10) {
            return a.toLocaleString(undefined, { minimumSignificantDigits: 2, maximumSignificantDigits: 2 });
        }
        return (a.toLocaleString(undefined, { maximumSignificantDigits: 3, minimumSignificantDigits: 3 }));
    }
}