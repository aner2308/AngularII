//Interface till min hämtning från API

export interface Course {
    code: string,
    coursename: string,
    progression: "A" | "B" | "C",
    syllabus: string
}
