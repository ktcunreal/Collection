package main

import (
	. "fmt"
	. "sort"
	. "strconv"
)

func getNum(n string) (i1, i2 int) {
	var S = make([]int, 4)
	for i, v := range n {
		n, _ := Atoi(Sprintf("%c", v))
		S[i] = n
	}
	Slice(S, func(i, j int) bool {
		return S[i] > S[j]
	})
	i1 = S[0]*1000 + S[1]*100 + S[2]*10 + S[3]
	i2 = S[3]*1000 + S[2]*100 + S[1]*10 + S[0]
	return
}
func main() {
	s, n := "", 0
	Scanf("%s", &s)
	for i1, i2 := getNum(s); ; {
		n = i1 - i2
		Printf("%04d - %04d = %04d\n", i1, i2, n)
		if n == 6174 || n == 0000 {
			break
		}
		i1, i2 = getNum(Itoa(n))
	}

}
