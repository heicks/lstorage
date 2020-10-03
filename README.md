# lstorage
localStorage and SessionStorage and CookieStorage and MenemStorage and ...Storage

```
> How to use:

const ls = lsorage.ls; // localStorage
const ss = lsorage.ss; // sessionStorage

const cs = lsorage.cs; // cookieStorage
const ms = lsorage.ms; // memaryStorage
```

ls, ss:

.get(<key>)

.set(<key>,<value>)

.up(<key>,<index><value>);  // update  `value` `index`of `key` in `ls/ss`

help

---

cs("key","value","<time>")

​									┗ <time> 

​											┣  s<num> // `s1` // 1 second

​											┣  h<num> // `h2` // 2 Hours

​											┗  d<num> // `d3` // 3 day

---

other use: `console.log(ls,ss,cs,ms)`show all list feature

