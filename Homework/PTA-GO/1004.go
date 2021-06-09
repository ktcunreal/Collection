package main

import (
	. "fmt"
	. "sort"
)

type student struct {
	name  string
	id    string
	score int
}

func main() {
	T := 0
	Scanf("%d", &T)
	S := make([]student, T)
	for i := 0; i < T; i++ {
		Scanf("%s %s %d", &S[i].name, &S[i].id, &S[i].score)
	}
	Slice(S, func(i, j int) bool {
		return S[i].score > S[j].score
	})
	Printf("%s %s\n%s %s\n", S[0].name, S[0].id, S[T-1].name, S[T-1].id)
}
