package main

import (
	. "fmt"
	"unicode"
)

var (
	P  = []int{7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2}
	M  = []string{"1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"}
	AP = true
	T  int
	s  string
)

func main() {
	Scanf("%d", &T)
	for i := 0; i < T; i++ {
		Scanf("%s", &s)
		if !vld(s) {
			Printf("%s\n", s)
			AP = false
		}
	}
	if AP {
		Printf("All passed")
	}
}

func vld(s string) bool {
	var Z int
	for i, v := range s[0:17] {
		if !unicode.IsNumber(v) {
			return false
		}
		Z += P[i] * int(v-'0')
	}
	if s[17:] != M[Z%11] {
		return false
	}
	return true
}

/*func btoi(b []byte) (res int) {
	if b[0] == 45 {
		for i := 1; i < len(b); i++ {
			v := b[i] - '0'
			res *= 10
			res += int(v)
		}
		res = -res
	} else {
		for i := 0; i < len(b); i++ {
			v := b[i] - '0'
			res *= 10
			res += int(v)
		}
	}
	return
}*/
