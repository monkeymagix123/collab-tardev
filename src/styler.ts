import { computed } from "vue";

export const styler = {
    writeFullNumber: function (a: number) {
        if (a < 10) {
            return a.toLocaleString(undefined, { minimumSignificantDigits: 2, maximumSignificantDigits: 2 });
        }
        return (a.toLocaleString(undefined, { maximumFractionDigits: 0 }));
    },

    writeNumber: function (a: number) {
        if (a < 10) {
            return a.toLocaleString(undefined, { minimumSignificantDigits: 2, maximumSignificantDigits: 2 });
        }

        let units = [
            { value: 1e3, suffix: 'K' },     // Thousand
            { value: 1e6, suffix: 'M' },     // Million
            { value: 1e9, suffix: 'B' },     // Billion
            { value: 1e12, suffix: 'T' },    // Trillion
            { value: 1e15, suffix: 'Q' },    // Quadrillion
            { value: 1e18, suffix: 'Qn' },    // Quintillion
            { value: 1e21, suffix: 'Sx' },
            { value: 1e24, suffix: 'Sp' },
            { value: 1e27, suffix: 'Oc' },
            { value: 1e30, suffix: 'No' },
            { value: 1e33, suffix: 'Dc' },
        ];

        units = units.reverse();

        if (a >= 1e36) {
            return a.toPrecision(3);
        }

        for (const unit of units) {
            if (a >= unit.value) {
                // delete trailing 0's
                // return (a / unit.value).toPrecision(3).replace(/\.0$/, '') + ' ' + unit.suffix;
                return (a / unit.value).toPrecision(3) + ' ' + unit.suffix;
            }
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