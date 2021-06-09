package main

import (
	. "fmt"
	. "strconv"
)

func Printn(n, digit int) {
	switch digit {
	case 1:
		for i := 1; i <= n; i++ {
			Printf("%d", i)
		}
	case 2:
		for i := 0; i < n; i++ {
			Printf("%s", "S")
		}

	case 3:
		for i := 0; i < n; i++ {
			Printf("%s", "B")
		}
	}
}
func main() {
	input, S := "", []int{}
	Scanf("%s", &input)
	for _, v := range input {
		i, _ := Atoi(Sprintf("%c", v))
		S = append(S, i)
	}
	for i := 0; i < len(S); i++ {
		Printn(S[i], len(S)-i)
	}
}
