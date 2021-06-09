package main

import (
	. "fmt"
	. "unicode"
)

var dateTab = map[string]string{
	"A": "MON",
	"B": "TUE",
	"C": "WED",
	"D": "THU",
	"E": "FRI",
	"F": "SAT",
	"G": "SUN",
}

var timeTab = map[string]int{
	"0": 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"A": 10,
	"B": 11,
	"C": 12,
	"D": 13,
	"E": 14,
	"F": 15,
	"G": 16,
	"H": 17,
	"I": 18,
	"J": 19,
	"K": 20,
	"L": 21,
	"M": 22,
	"N": 23,
}

func cmp(i, j int) int {
	if i < j {
		return i
	} else {
		return j
	}
}
func main() {
	var str1, str2, str3, str4 string
	Scanf("%s\n%s\n%s\n%s\n", &str1, &str2, &str3, &str4)
	for i, f := 0, false; i < cmp(len(str1), len(str2)); i++ {
		if str1[i] == str2[i] {
			if v, ok := dateTab[Sprintf("%c", str1[i])]; ok && !f {
				Printf("%s ", v)
				f = true
				continue
			}
			if w, ok := timeTab[Sprintf("%c", str1[i])]; ok && f {
				Printf("%02d:", w)
				break
			}

		}
	}
	for i := 0; i < cmp(len(str3), len(str4)); i++ {
		if str3[i] == str4[i] && IsLetter(rune(str3[i])) {
			Printf("%02d", i)
			break
		}
	}
}
