package main

import (
	"bufio"
	. "fmt"
	. "os"
	. "sort"
	. "strconv"
	. "strings"
)

type student struct {
	id, m, t, cat int
}

var (
	T, L, H  int
	id, m, t int
	s        student
	S        []student
	NReader  = bufio.NewReader(Stdin)
)

func NumReader() (int, int, int) {
	input, _ := NReader.ReadString('\n')
	S := Split(Trim(input, "\n"), " ")
	id, _ := Atoi(S[0])
	m, _ := Atoi(S[1])
	t, _ := Atoi(S[2])
	return id, m, t
}

func main() {
	Scanf("%d %d %d ", &T, &L, &H)
	for i := 0; i < T; i++ {
		id, m, t = NumReader()
		if m >= L && t >= L {
			s.id, s.m, s.t = id, m, t
			if m >= H && t >= H {
				s.cat = 1
				S = append(S, s)
				continue
			} else if m >= H && t < H {
				s.cat = 2
				S = append(S, s)
				continue
			} else if m < H && t < H && m >= t {
				s.cat = 3
				S = append(S, s)
				continue
			} else {
				s.cat = 4
				S = append(S, s)
				continue
			}
		}
	}
	Println(len(S))
	Slice(S, func(i, j int) bool {
		sumi, sumj := S[i].m+S[i].t, S[j].m+S[j].t
		if S[i].cat == S[j].cat {
			if sumi == sumj {
				if S[i].m == S[j].m {
					return S[i].id < S[j].id
				}
				return S[i].m > S[j].m
			}
			return sumi > sumj
		}
		return S[i].cat < S[j].cat
	})
	for _, v := range S {
		Printf("%d %d %d\n", v.id, v.m, v.t)
	}
}
