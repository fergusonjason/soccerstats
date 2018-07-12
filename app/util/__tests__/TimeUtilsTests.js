import {getMaxMillisForYear, getMinMillisForYear, getFormattedDateForMillis, getMillisForFormattedDate} from "./../TimeUtils";

test('getMaxMillisForYear returns a value', () => {

    let maxMillis = getMaxMillisForYear(2018);
    console.log(maxMillis);
    expect(maxMillis).toBeGreaterThan(0);
});

test("getMinMillisForYear returns a value", () => {

    let minMillis = getMinMillisForYear(2018);
    console.log(minMillis);
    expect(minMillis).toBeGreaterThan(0);
});

test("MinMillis less that max millis", () => {
    let minMillis = getMinMillisForYear(2018);
    let maxMillis = getMaxMillisForYear(2018);

    expect(minMillis).toBeLessThan(maxMillis);
});

test("getFormattedDateForMillis returns value", () => {
    let formattedDate = getFormattedDateForMillis(1546318799999);
    console.log(formattedDate);
    expect(formattedDate.indexOf("12")).toBe(0);
});

test("getMillisForFormattedDate is number", () => {

    let millis = getMillisForFormattedDate("12/31/2018");
    console.log(millis);
    expect(typeof millis).toBe("number");
});