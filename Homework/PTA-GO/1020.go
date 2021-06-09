package main

import (
	. "fmt"
	. "sort"
)

type mc struct {
	stk, prc float32
}

func main() {
	var T int
	var m, A float32
	Scanf("%d%f", &T, &A)
	S := make([]mc, T)
	for i := 0; i < T; i++ {
		Scanf("%f", &S[i].stk)
	}
	for i := 0; i < T; i++ {
		Scanf("%f", &S[i].prc)
	}
	Slice(S, func(i, j int) bool {
		return S[i].prc/S[i].stk > S[j].prc/S[j].stk
	})
	for i := 0; i < T; i++ {
		if A >= S[i].stk {
			A -= S[i].stk
			m += S[i].prc
		} else {
			m += S[i].prc / S[i].stk * A
			break
		}
	}
	Printf("%.2f", m)
}
