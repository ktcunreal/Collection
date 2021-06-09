package main

import (
	. "fmt"
	. "strconv"
	. "strings"
)

var PinyinTab = map[int]string{
	1: "yi ",
	2: "er ",
	3: "san ",
	4: "si ",
	5: "wu ",
	6: "liu ",
	7: "qi ",
	8: "ba ",
	9: "jiu ",
	0: "ling ",
}

func ParseNum(s string) []int {
	res := make([]int, len(s))
	for i, v := range s {
		res[i], _ = Atoi(Sprintf("%c", v))
	}
	return res
}
func main() {
	S, n, i := "", "", 0
	pn, pi := &n, &i
	Scanf("%s", &S)
	for _, v := range ParseNum(S) {
		*pi += v
	}
	for _, v := range ParseNum(Itoa(i)) {
		*pn += PinyinTab[v]
	}
	Printf("%s\n", Trim(n, " "))
}
