import { Node } from 'relatives-tree/lib/types';

/** Sample family tree data for demonstration */
const sampleNodes: Node[] = [
  {
    id: 'grandpa1',
    gender: 'male' as const,
    parents: [],
    children: [
      { id: 'father', type: 'blood' as const },
      { id: 'uncle', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'grandma1', type: 'married' as const }],
  },
  {
    id: 'grandma1',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'father', type: 'blood' as const },
      { id: 'uncle', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'grandpa1', type: 'married' as const }],
  },
  {
    id: 'grandpa2',
    gender: 'male' as const,
    parents: [],
    children: [
      { id: 'mother', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'grandma2', type: 'married' as const }],
  },
  {
    id: 'grandma2',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'mother', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'grandpa2', type: 'married' as const }],
  },
  {
    id: 'father',
    gender: 'male' as const,
    parents: [
      { id: 'grandpa1', type: 'blood' as const },
      { id: 'grandma1', type: 'blood' as const },
    ],
    children: [
      { id: 'me', type: 'blood' as const },
      { id: 'sister', type: 'blood' as const },
      { id: 'brother', type: 'blood' as const },
    ],
    siblings: [
      { id: 'uncle', type: 'blood' as const },
    ],
    spouses: [{ id: 'mother', type: 'married' as const }],
  },
  {
    id: 'mother',
    gender: 'female' as const,
    parents: [
      { id: 'grandpa2', type: 'blood' as const },
      { id: 'grandma2', type: 'blood' as const },
    ],
    children: [
      { id: 'me', type: 'blood' as const },
      { id: 'sister', type: 'blood' as const },
      { id: 'brother', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'father', type: 'married' as const }],
  },
  {
    id: 'uncle',
    gender: 'male' as const,
    parents: [
      { id: 'grandpa1', type: 'blood' as const },
      { id: 'grandma1', type: 'blood' as const },
    ],
    children: [
      { id: 'cousin1', type: 'blood' as const },
    ],
    siblings: [
      { id: 'father', type: 'blood' as const },
    ],
    spouses: [{ id: 'aunt', type: 'married' as const }],
  },
  {
    id: 'aunt',
    gender: 'female' as const,
    parents: [],
    children: [
      { id: 'cousin1', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'uncle', type: 'married' as const }],
  },
  {
    id: 'me',
    gender: 'male' as const,
    parents: [
      { id: 'father', type: 'blood' as const },
      { id: 'mother', type: 'blood' as const },
    ],
    children: [
      { id: 'daughter', type: 'blood' as const },
      { id: 'son', type: 'blood' as const },
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
    parents: [],
    children: [
      { id: 'daughter', type: 'blood' as const },
      { id: 'son', type: 'blood' as const },
    ],
    siblings: [],
    spouses: [{ id: 'me', type: 'married' as const }],
  },
  {
    id: 'sister',
    gender: 'female' as const,
    parents: [
      { id: 'father', type: 'blood' as const },
      { id: 'mother', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'me', type: 'blood' as const },
      { id: 'brother', type: 'blood' as const },
    ],
    spouses: [],
  },
  {
    id: 'brother',
    gender: 'male' as const,
    parents: [
      { id: 'father', type: 'blood' as const },
      { id: 'mother', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'me', type: 'blood' as const },
      { id: 'sister', type: 'blood' as const },
    ],
    spouses: [],
  },
  {
    id: 'cousin1',
    gender: 'male' as const,
    parents: [
      { id: 'uncle', type: 'blood' as const },
      { id: 'aunt', type: 'blood' as const },
    ],
    children: [],
    siblings: [],
    spouses: [],
  },
  {
    id: 'daughter',
    gender: 'female' as const,
    parents: [
      { id: 'me', type: 'blood' as const },
      { id: 'wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'son', type: 'blood' as const },
    ],
    spouses: [],
  },
  {
    id: 'son',
    gender: 'male' as const,
    parents: [
      { id: 'me', type: 'blood' as const },
      { id: 'wife', type: 'blood' as const },
    ],
    children: [],
    siblings: [
      { id: 'daughter', type: 'blood' as const },
    ],
    spouses: [],
  },
];

/** Human-readable names for display */
export const nodeNames: Record<string, string> = {
  grandpa1: 'James Wilson',
  grandma1: 'Mary Wilson',
  grandpa2: 'Robert Chen',
  grandma2: 'Linda Chen',
  father: 'David Wilson',
  mother: 'Sarah Chen',
  uncle: 'Michael Wilson',
  aunt: 'Emma Wilson',
  me: 'Alex Wilson',
  wife: 'Olivia Smith',
  sister: 'Sophie Wilson',
  brother: 'Daniel Wilson',
  cousin1: 'Ethan Wilson',
  daughter: 'Lily Wilson',
  son: 'Noah Wilson',
};

export default sampleNodes;
