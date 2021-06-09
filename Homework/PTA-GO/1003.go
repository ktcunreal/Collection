package main

import (
	. "fmt"
	. "strings"
)

func StrCheck(s string) string {
	P, A, T := Count(s, "P"), Count(s, "A"), Count(s, "T")
	if P != 1 || T != 1 || A != len(s)-2 {
		return "NO"
	}
	ioP, ioT := Index(s, "P"), Index(s, "T")
	if ioT < 2 || ioP > ioT {
		return "NO"
	}
	a, b, c := ioP, len(s[ioP+1:ioT]), len(s[ioT:])-1
	if b != 0 && a*b == c {
		return "YES"
	}
	return "NO"
}
func main() {
	T, S := 0, ""
	Scanf("%d", &T)
	for i := 0; i < T; i++ {
		Scanf("%s", &S)
		Println(StrCheck(S))
	}
}
