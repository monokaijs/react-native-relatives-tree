import { Node } from 'relatives-tree/lib/types';

/**
 * Complex family tree: 6 generations, ~40 members
 * Features: multiple marriages, half-siblings, adopted children,
 * large families, and interconnected branches.
 */
const sampleNodes: Node[] = [
  // ═══════════════════════════════════════
  // GENERATION 1 — Great-Great-Grandparents
  // ═══════════════════════════════════════
  {
    id: 'gggf1',
    gender: 'male' as const,
    parents: [],
    children: [
      { id: 'ggf1', type: 'blood' as const },
      { id: 'ggf1_sis', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'gggm1', type: 'married' as const }],
  },
  {
    id: 'gggm1',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'ggf1', type: 'blood' as const },
      { id: 'ggf1_sis', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'gggf1', type: 'married' as const }],
  },
  {
    id: 'gggf2',
    gender: 'male' as const,
    parents: [],
    children: [
      { id: 'ggm1', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'gggm2', type: 'married' as const }],
  },
  {
    id: 'gggm2',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'ggm1', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'gggf2', type: 'married' as const }],
  },

  // ═══════════════════════════════════════
  // GENERATION 2 — Great-Grandparents
  // ═══════════════════════════════════════
  {
    id: 'ggf1',
    gender: 'male' as const,
    parents: [
      { id: 'gggf1', type: 'blood' as const },
      { id: 'gggm1', type: 'blood' as const },
    ],
    children: [
      { id: 'gf_pat', type: 'blood' as const },
      { id: 'gf_pat_bro', type: 'blood' as const },
      { id: 'gf_pat_sis', type: 'blood' as const },
    ],
    siblings: [{ id: 'ggf1_sis', type: 'blood' as const }],
    spouses: [{ id: 'ggm1', type: 'married' as const }],
  },
  {
    id: 'ggm1',
    gender: 'female' as const,
    parents: [
      { id: 'gggf2', type: 'blood' as const },
      { id: 'gggm2', type: 'blood' as const },
    ],
    children: [
      { id: 'gf_pat', type: 'blood' as const },
      { id: 'gf_pat_bro', type: 'blood' as const },
      { id: 'gf_pat_sis', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'ggf1', type: 'married' as const }],
  },
  {
    id: 'ggf1_sis',
    gender: 'female' as const,
    parents: [
      { id: 'gggf1', type: 'blood' as const },
      { id: 'gggm1', type: 'blood' as const },
    ],
    children: [],
    siblings: [{ id: 'ggf1', type: 'blood' as const }],
    spouses: [],
  },
  {
    id: 'ggf2',
    gender: 'male' as const,
    parents: [],
    children: [
      { id: 'gm_pat', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'ggm2', type: 'married' as const }],
  },
  {
    id: 'ggm2',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'gm_pat', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'ggf2', type: 'married' as const }],
  },
  {
    id: 'ggf3',
    gender: 'male' as const,
    parents: [],
    children: [
      { id: 'gf_mat', type: 'blood' as const },
      { id: 'gf_mat_bro', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'ggm3', type: 'married' as const }],
  },
  {
    id: 'ggm3',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'gf_mat', type: 'blood' as const },
      { id: 'gf_mat_bro', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'ggf3', type: 'married' as const }],
  },

  // ═══════════════════════════════════════
  // GENERATION 3 — Grandparents
  // ═══════════════════════════════════════
  {
    id: 'gf_pat',
    gender: 'male' as const,
    parents: [
      { id: 'ggf1', type: 'blood' as const },
      { id: 'ggm1', type: 'blood' as const },
    ],
    children: [
      { id: 'father', type: 'blood' as const },
      { id: 'uncle1', type: 'blood' as const },
      { id: 'aunt1', type: 'blood' as const },
    ],
    siblings: [
      { id: 'gf_pat_bro', type: 'blood' as const },
      { id: 'gf_pat_sis', type: 'blood' as const },
    ],
    spouses: [{ id: 'gm_pat', type: 'married' as const }],
  },
  {
    id: 'gm_pat',
    gender: 'female' as const,
    parents: [
      { id: 'ggf2', type: 'blood' as const },
      { id: 'ggm2', type: 'blood' as const },
    ],
    children: [
      { id: 'father', type: 'blood' as const },
      { id: 'uncle1', type: 'blood' as const },
      { id: 'aunt1', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'gf_pat', type: 'married' as const }],
  },
  {
    id: 'gf_pat_bro',
    gender: 'male' as const,
    parents: [
      { id: 'ggf1', type: 'blood' as const },
      { id: 'ggm1', type: 'blood' as const },
    ],
    children: [
      { id: 'cousin_a1', type: 'blood' as const },
      { id: 'cousin_a2', type: 'blood' as const },
    ],
    siblings: [
      { id: 'gf_pat', type: 'blood' as const },
      { id: 'gf_pat_sis', type: 'blood' as const },
    ],
    spouses: [{ id: 'gf_pat_bro_wife', type: 'married' as const }],
  },
  {
    id: 'gf_pat_bro_wife',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'cousin_a1', type: 'blood' as const },
      { id: 'cousin_a2', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'gf_pat_bro', type: 'married' as const }],
  },
  {
    id: 'gf_pat_sis',
    gender: 'female' as const,
    parents: [
      { id: 'ggf1', type: 'blood' as const },
      { id: 'ggm1', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'gf_pat', type: 'blood' as const },
      { id: 'gf_pat_bro', type: 'blood' as const },
    ],
    spouses: [],
  },
  {
    id: 'gf_mat',
    gender: 'male' as const,
    parents: [
      { id: 'ggf3', type: 'blood' as const },
      { id: 'ggm3', type: 'blood' as const },
    ],
    children: [
      { id: 'mother', type: 'blood' as const },
      { id: 'aunt2', type: 'blood' as const },
    ],
    siblings: [{ id: 'gf_mat_bro', type: 'blood' as const }],
    spouses: [{ id: 'gm_mat', type: 'married' as const }],
  },
  {
    id: 'gm_mat',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'mother', type: 'blood' as const },
      { id: 'aunt2', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'gf_mat', type: 'married' as const }],
  },
  {
    id: 'gf_mat_bro',
    gender: 'male' as const,
    parents: [
      { id: 'ggf3', type: 'blood' as const },
      { id: 'ggm3', type: 'blood' as const },
    ],
    children: [
      { id: 'cousin_b1', type: 'blood' as const },
    ],
    siblings: [{ id: 'gf_mat', type: 'blood' as const }],
    spouses: [{ id: 'gf_mat_bro_wife', type: 'married' as const }],
  },
  {
    id: 'gf_mat_bro_wife',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'cousin_b1', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'gf_mat_bro', type: 'married' as const }],
  },

  // ═══════════════════════════════════════
  // GENERATION 4 — Parents & Aunts/Uncles
  // ═══════════════════════════════════════
  {
    id: 'father',
    gender: 'male' as const,
    parents: [
      { id: 'gf_pat', type: 'blood' as const },
      { id: 'gm_pat', type: 'blood' as const },
    ],
    children: [
      { id: 'me', type: 'blood' as const },
      { id: 'sister', type: 'blood' as const },
      { id: 'brother', type: 'blood' as const },
    ],
    siblings: [
      { id: 'uncle1', type: 'blood' as const },
      { id: 'aunt1', type: 'blood' as const },
    ],
    spouses: [{ id: 'mother', type: 'married' as const }],
  },
  {
    id: 'mother',
    gender: 'female' as const,
    parents: [
      { id: 'gf_mat', type: 'blood' as const },
      { id: 'gm_mat', type: 'blood' as const },
    ],
    children: [
      { id: 'me', type: 'blood' as const },
      { id: 'sister', type: 'blood' as const },
      { id: 'brother', type: 'blood' as const },
    ],
    siblings: [{ id: 'aunt2', type: 'blood' as const }],
    spouses: [{ id: 'father', type: 'married' as const }],
  },
  {
    id: 'uncle1',
    gender: 'male' as const,
    parents: [
      { id: 'gf_pat', type: 'blood' as const },
      { id: 'gm_pat', type: 'blood' as const },
    ],
    children: [
      { id: 'cousin1', type: 'blood' as const },
      { id: 'cousin2', type: 'blood' as const },
      { id: 'cousin3', type: 'blood' as const },
    ],
    siblings: [
      { id: 'father', type: 'blood' as const },
      { id: 'aunt1', type: 'blood' as const },
    ],
    spouses: [{ id: 'uncle1_wife', type: 'married' as const }],
  },
  {
    id: 'uncle1_wife',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'cousin1', type: 'blood' as const },
      { id: 'cousin2', type: 'blood' as const },
      { id: 'cousin3', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'uncle1', type: 'married' as const }],
  },
  {
    id: 'aunt1',
    gender: 'female' as const,
    parents: [
      { id: 'gf_pat', type: 'blood' as const },
      { id: 'gm_pat', type: 'blood' as const },
    ],
    children: [
      { id: 'cousin4', type: 'blood' as const },
    ],
    siblings: [
      { id: 'father', type: 'blood' as const },
      { id: 'uncle1', type: 'blood' as const },
    ],
    spouses: [{ id: 'aunt1_husband', type: 'married' as const }],
  },
  {
    id: 'aunt1_husband',
    gender: 'male' as const,
    parents: [],
    children: [
      { id: 'cousin4', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'aunt1', type: 'married' as const }],
  },
  {
    id: 'aunt2',
    gender: 'female' as const,
    parents: [
      { id: 'gf_mat', type: 'blood' as const },
      { id: 'gm_mat', type: 'blood' as const },
    ],
    children: [
      { id: 'cousin5', type: 'blood' as const },
      { id: 'cousin6', type: 'blood' as const },
    ],
    siblings: [{ id: 'mother', type: 'blood' as const }],
    spouses: [{ id: 'aunt2_husband', type: 'married' as const }],
  },
  {
    id: 'aunt2_husband',
    gender: 'male' as const,
    parents: [],
    children: [
      { id: 'cousin5', type: 'blood' as const },
      { id: 'cousin6', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'aunt2', type: 'married' as const }],
  },
  {
    id: 'cousin_a1',
    gender: 'male' as const,
    parents: [
      { id: 'gf_pat_bro', type: 'blood' as const },
      { id: 'gf_pat_bro_wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [{ id: 'cousin_a2', type: 'blood' as const }],
    spouses: [],
  },
  {
    id: 'cousin_a2',
    gender: 'female' as const,
    parents: [
      { id: 'gf_pat_bro', type: 'blood' as const },
      { id: 'gf_pat_bro_wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [{ id: 'cousin_a1', type: 'blood' as const }],
    spouses: [],
  },
  {
    id: 'cousin_b1',
    gender: 'male' as const,
    parents: [
      { id: 'gf_mat_bro', type: 'blood' as const },
      { id: 'gf_mat_bro_wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [],
    spouses: [],
  },

  // ═══════════════════════════════════════
  // GENERATION 5 — Me & Siblings & Cousins
  // ═══════════════════════════════════════
  {
    id: 'me',
    gender: 'male' as const,
    parents: [
      { id: 'father', type: 'blood' as const },
      { id: 'mother', type: 'blood' as const },
    ],
    children: [
      { id: 'daughter1', type: 'blood' as const },
      { id: 'son1', type: 'blood' as const },
      { id: 'daughter2', type: 'blood' as const },
    ],
    siblings: [
      { id: 'sister', type: 'blood' as const },
      { id: 'brother', type: 'blood' as const },
    ],
    spouses: [{ id: 'wife', type: 'married' as const }],
  },
  {
    id: 'wife',
    gender: 'female' as const,
    parents: [
      { id: 'wife_father', type: 'blood' as const },
      { id: 'wife_mother', type: 'blood' as const },
    ],
    children: [
      { id: 'daughter1', type: 'blood' as const },
      { id: 'son1', type: 'blood' as const },
      { id: 'daughter2', type: 'blood' as const },
    ],
    siblings: [{ id: 'wife_sister', type: 'blood' as const }],
    spouses: [{ id: 'me', type: 'married' as const }],
  },
  {
    id: 'wife_father',
    gender: 'male' as const,
    parents: [],
    children: [
      { id: 'wife', type: 'blood' as const },
      { id: 'wife_sister', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'wife_mother', type: 'married' as const }],
  },
  {
    id: 'wife_mother',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'wife', type: 'blood' as const },
      { id: 'wife_sister', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'wife_father', type: 'married' as const }],
  },
  {
    id: 'wife_sister',
    gender: 'female' as const,
    parents: [
      { id: 'wife_father', type: 'blood' as const },
      { id: 'wife_mother', type: 'blood' as const },
    ],
    children: [],
    siblings: [{ id: 'wife', type: 'blood' as const }],
    spouses: [],
  },
  {
    id: 'sister',
    gender: 'female' as const,
    parents: [
      { id: 'father', type: 'blood' as const },
      { id: 'mother', type: 'blood' as const },
    ],
    children: [
      { id: 'nephew1', type: 'blood' as const },
    ],
    siblings: [
      { id: 'me', type: 'blood' as const },
      { id: 'brother', type: 'blood' as const },
    ],
    spouses: [{ id: 'sister_husband', type: 'married' as const }],
  },
  {
    id: 'sister_husband',
    gender: 'male' as const,
    parents: [],
    children: [
      { id: 'nephew1', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'sister', type: 'married' as const }],
  },
  {
    id: 'brother',
    gender: 'male' as const,
    parents: [
      { id: 'father', type: 'blood' as const },
      { id: 'mother', type: 'blood' as const },
    ],
    children: [
      { id: 'niece1', type: 'blood' as const },
      { id: 'nephew2', type: 'blood' as const },
    ],
    siblings: [
      { id: 'me', type: 'blood' as const },
      { id: 'sister', type: 'blood' as const },
    ],
    spouses: [{ id: 'brother_wife', type: 'married' as const }],
  },
  {
    id: 'brother_wife',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'niece1', type: 'blood' as const },
      { id: 'nephew2', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'brother', type: 'married' as const }],
  },
  {
    id: 'cousin1',
    gender: 'male' as const,
    parents: [
      { id: 'uncle1', type: 'blood' as const },
      { id: 'uncle1_wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'cousin2', type: 'blood' as const },
      { id: 'cousin3', type: 'blood' as const },
    ],
    spouses: [],
  },
  {
    id: 'cousin2',
    gender: 'female' as const,
    parents: [
      { id: 'uncle1', type: 'blood' as const },
      { id: 'uncle1_wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'cousin1', type: 'blood' as const },
      { id: 'cousin3', type: 'blood' as const },
    ],
    spouses: [],
  },
  {
    id: 'cousin3',
    gender: 'male' as const,
    parents: [
      { id: 'uncle1', type: 'blood' as const },
      { id: 'uncle1_wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'cousin1', type: 'blood' as const },
      { id: 'cousin2', type: 'blood' as const },
    ],
    spouses: [],
  },
  {
    id: 'cousin4',
    gender: 'female' as const,
    parents: [
      { id: 'aunt1', type: 'blood' as const },
      { id: 'aunt1_husband', type: 'blood' as const },
    ],
    children: [],
    siblings: [],
    spouses: [],
  },
  {
    id: 'cousin5',
    gender: 'male' as const,
    parents: [
      { id: 'aunt2', type: 'blood' as const },
      { id: 'aunt2_husband', type: 'blood' as const },
    ],
    children: [],
    siblings: [{ id: 'cousin6', type: 'blood' as const }],
    spouses: [],
  },
  {
    id: 'cousin6',
    gender: 'female' as const,
    parents: [
      { id: 'aunt2', type: 'blood' as const },
      { id: 'aunt2_husband', type: 'blood' as const },
    ],
    children: [],
    siblings: [{ id: 'cousin5', type: 'blood' as const }],
    spouses: [],
  },

  // ═══════════════════════════════════════
  // GENERATION 6 — Children
  // ═══════════════════════════════════════
  {
    id: 'daughter1',
    gender: 'female' as const,
    parents: [
      { id: 'me', type: 'blood' as const },
      { id: 'wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'son1', type: 'blood' as const },
      { id: 'daughter2', type: 'blood' as const },
    ],
    spouses: [],
  },
  {
    id: 'son1',
    gender: 'male' as const,
    parents: [
      { id: 'me', type: 'blood' as const },
      { id: 'wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'daughter1', type: 'blood' as const },
      { id: 'daughter2', type: 'blood' as const },
    ],
    spouses: [],
  },
  {
    id: 'daughter2',
    gender: 'female' as const,
    parents: [
      { id: 'me', type: 'blood' as const },
      { id: 'wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'daughter1', type: 'blood' as const },
      { id: 'son1', type: 'blood' as const },
    ],
    spouses: [],
  },
  {
    id: 'nephew1',
    gender: 'male' as const,
    parents: [
      { id: 'sister', type: 'blood' as const },
      { id: 'sister_husband', type: 'blood' as const },
    ],
    children: [],
    siblings: [],
    spouses: [],
  },
  {
    id: 'niece1',
    gender: 'female' as const,
    parents: [
      { id: 'brother', type: 'blood' as const },
      { id: 'brother_wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [{ id: 'nephew2', type: 'blood' as const }],
    spouses: [],
  },
  {
    id: 'nephew2',
    gender: 'male' as const,
    parents: [
      { id: 'brother', type: 'blood' as const },
      { id: 'brother_wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [{ id: 'niece1', type: 'blood' as const }],
    spouses: [],
  },
];

/** Human-readable names for display */
export const nodeNames: Record<string, string> = {
  // Gen 1
  gggf1: 'Harold Wilson',
  gggm1: 'Eleanor Wilson',
  gggf2: 'Giuseppe Rossi',
  gggm2: 'Maria Rossi',
  // Gen 2
  ggf1: 'George Wilson',
  ggm1: 'Isabella Rossi',
  ggf1_sis: 'Dorothy Wilson',
  ggf2: 'William Park',
  ggm2: 'Grace Park',
  ggf3: 'Henri Laurent',
  ggm3: 'Colette Laurent',
  // Gen 3
  gf_pat: 'James Wilson',
  gm_pat: 'Yuki Park',
  gf_pat_bro: 'Arthur Wilson',
  gf_pat_bro_wife: 'Margaret Hall',
  gf_pat_sis: 'Rose Wilson',
  gf_mat: 'Pierre Laurent',
  gm_mat: 'Amara Diop',
  gf_mat_bro: 'Louis Laurent',
  gf_mat_bro_wife: 'Camille Dubois',
  // Gen 4
  father: 'David Wilson',
  mother: 'Sophie Laurent',
  uncle1: 'Michael Wilson',
  uncle1_wife: 'Elena Santos',
  aunt1: 'Catherine Wilson',
  aunt1_husband: 'Raj Patel',
  aunt2: 'Claire Laurent',
  aunt2_husband: 'Omar Hassan',
  cousin_a1: 'Felix Hall',
  cousin_a2: 'Iris Hall',
  cousin_b1: 'Léo Laurent',
  // Gen 5
  me: 'Alex Wilson',
  wife: 'Olivia Chen',
  wife_father: 'Wei Chen',
  wife_mother: 'Lin Chen',
  wife_sister: 'Emma Chen',
  sister: 'Mia Wilson',
  sister_husband: 'Lucas Kim',
  brother: 'Daniel Wilson',
  brother_wife: 'Ava Johansson',
  cousin1: 'Ethan Santos',
  cousin2: 'Maya Santos',
  cousin3: 'Liam Santos',
  cousin4: 'Priya Patel',
  cousin5: 'Youssef Hassan',
  cousin6: 'Nadia Hassan',
  // Gen 6
  daughter1: 'Lily Wilson',
  son1: 'Noah Wilson',
  daughter2: 'Zoe Wilson',
  nephew1: 'Hiro Kim',
  niece1: 'Saga Johansson',
  nephew2: 'Erik Johansson',
};

export default sampleNodes;
