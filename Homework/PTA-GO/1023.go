package main

import (
	. "fmt"
	. "sort"
)

func main() {
	n := 0
	var S []int
	for i := 0; i < 10; i++ {
		Scanf("%d", &n)
		for j := 0; j < n; j++ {
			S = append(S, i)
		}
	}
	Slice(S, func(i, j int) bool {
		return S[i] < S[j]
	})
	if S[0] == 0 {
		for i := 1; i < len(S); i++ {
			if S[i] != 0 {
				S[0], S[i] = S[i], S[0]
				break
			}
		}
	}
	for _, v := range S {
		Printf("%d", v)
	}
}
