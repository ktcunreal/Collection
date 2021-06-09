package main

import (
	. "fmt"
	. "sort"
)

func calc(n int) {
	for n != 1 {
		if n%2 == 0 {
			n = n / 2
		} else {
			n = (3*n + 1) / 2
		}
		if _, ok := T[n]; ok {
			return
		} else {
			T[n] = true
		}
	}
}

var (
	T    = make(map[int]bool)
	S, R = []int{}, []int{}
	t, n int
)

func main() {
	Scanf("%d", &n)
	for i := 0; i < n; i++ {
		Scanf("%d", &t)
		calc(t)
		S = append(S, t)
	}
	for _, e := range S {
		if _, ok := T[e]; !ok {
			R = append(R, e)
		}
	}
	Slice(R, func(i, j int) bool {
		return R[i] > R[j]
	})
	for i := 0; i < len(R)-1; i++ {
		Printf("%d ", R[i])
	}
	Printf("%d", R[len(R)-1])
}
