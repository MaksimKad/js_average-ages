'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century) {
  const menArr = people.filter(person =>
    century
      ? Math.ceil(person.died / 100) === century
        && person.sex === 'm'
      : person.sex === 'm',
  );

  return menArr.reduce((acc, curVal) =>
    acc + curVal.died - curVal.born, 0) / menArr.length;
};

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  const womanArr = people.filter(person =>
    withChildren
      ? people.some(child => child.mother === person.name)
        && person.sex === 'f'
      : person.sex === 'f',
  );

  return womanArr.reduce((acc, curVal) =>
    acc + curVal.died - curVal.born, 0) / womanArr.length;
};

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */

function calculateAvg(arr) {
  const total = arr.reduce((a, b) => a + b, 0);

  return (total / arr.length) || 0;
};

function calculateAverageAgeDiff(people, onlyWithSon) {
  const child = people.filter(person =>
    onlyWithSon
      ? people.find(mother => mother.name === person.mother)
        && person.sex === 'm'
      : people.find(mother => mother.name === person.mother)
  );

  const ageDiff = child.map(children => {
    const childMother = people.find(mother => mother.name === children.mother);

    return children.born - childMother.born;
  });

  return calculateAvg(ageDiff);
};

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
