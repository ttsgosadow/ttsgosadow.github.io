//GG17
            function getStrategyBook1(suit) {
                var strategy = {
                    bj: ["Stake a Claim", ""],
                    rj: ["Stake a Claim", "<em>Special Rules</em><br />A model may take a (2) Interact Action to discard all Claim Markers within 6\" of itself, and then place a Claim Marker in base contact with itself.<br /><br /><em>Victory Points</em>At the end of each Turn after the first, a Crew earns 1 VP if there are more Claim Markers on the Enemy Half of the table than its own."],
                    c: ["Reckoning", "<em>Victory Points</em><br />At the end of every Turn, after the first, a Crew earns 1 VP if it killed or sacrificed two or more enemy models during that Turn.<br /><br />At the end of every Turn after the first, if a player has no models in play (buried models are not considered \"in play\") then her opponent earns 1 VP. A player may not earn more than 1 VP from this Strategy per Turn."],
                    m: ["Reconnoiter", "<em>Setup</em>
Divide the table into four 18" x 18" table Quarters.
<em>Victory Points</em>
At the end of each Turn after the first, a Crew earns 1
VP if it controls two or more table Quarters.
To control a table quarter, the Crew must have the
most non-Peon models within the table Quarter.
These models cannot be within 6" of the Center of
the table, or partially within another table Quarter."],
                    r: ["Turf War", "<em>Setup</em>
Place a single Turf Marker at the Center of the table.
<em>Victory Points</em>
At the end of each Turn after the first, a Crew earns
1 VP if it has two or"],
                    t: ["Squatter's Rights", "<em>Setup</em>
Place five 30mm Squat Markers along the Centerline.
One is placed at the Center of the table. Then, two
more are placed on the Centerline 6" away from the
Center of the table (one on each side). Lastly, two
more are placed on the Centerline 6" away from
table's edge (one on each side).
<em>Special Rules</em>
Squat Markers begin the game claimed by neither Crew.
A model may take a (1) Interact Action to claim any
Squat marker that is in base contact with the model.
A Squat marker is only ever claimed by the last Crew
to interact with it, all previous claims are removed.
<em>Victory Points</em>
At the end of each Turn after the first, a Crew earns 1
VP if it has claim to at least two Squat Markers."]
                }
                return strategy[suit]
            }
            function getSchemesBook1(s1, v1, s2, v2) {
                var schemes = {
                    always: ["always", "Claim Jump", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, if this Crew has at least two Scheme Markers within 2\" of the Centerline of the board, not within 2\" of an enemy model, and not within 4\" of another friendly Scheme Marker, this Crew scores 1 VP and removes all friendly Scheme Markers within 2\" of the Centerline."],
                    doubles: ["doubles", "Eliminate the Leadership", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br/>The first time the enemy Leader is reduced below half of their starting Wounds, score 1 VP.<br />The first time the enemy Leader is reduced to 0 Wounds, Killed, or Sacrificed score 1 VP.<br />If there is no enemy Leader in play at the end of the game, score 1 VP."],
                    c: ["c", "Dig Their Graves", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />Once per turn, after this Crew kills or sacrifices an enemy non-Peon model that is within 4\" of one or more Scheme Markers friendly to this Crew, score 1 VP, then your opponent may remove one Scheme Marker friendly to your Crew within 4\" of the killed (or sacrificed) model.<br />If this Scheme and another of your Schemes would score any VP off the same model being killed or sacrificed, you must choose only one of your Schemes to score from."],
                    m: ["m", "Accusation!", "This Scheme may not start revealed.<br />All non-Peon models in this Crew may target a non- Peon enemy model within 1” that has not yet Activated this Turn with a (1) Interact Action to give the target the following Condition for the rest of the game:<br/>Accused: This model gains the following Action: \"(1) Hold It!: Remove the Accused Condition from this model. This Action may not be taken while this model is engaged.\" No other Action or Ability can remove this Condition.<br />The first time an enemy model gains the Accused Condition, reveal this Scheme. At the end of every Turn after the first, this Crew may end the Accused Condition on one enemy model in play to gain 1 VP."],
                    r: ["r", "Frame for Murder", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />When you choose this Scheme, note one of this Crew's non-Peon models as the \"sucker.\" If the chosen \"sucker\" model is killed or sacrificed by an enemy model, score 1 VP.<br />If the enemy model was a Master or Henchman, score 1 additional VP.<br />If this Scheme was accomplished on or before Turn 3, score 1 additional VP."],
                    t: ["t", "Leave Your Mark", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, this Crew may remove one of its Scheme Markers which is on the opponent's half of the board, not within 6\" of the of the Centerline, and not within 4\" of a non-Peon enemy model to score 1 VP."],
                    1: [1, "Covert Breakthrough", "This Scheme may not start revealed.<br />At the end of the game, this Crew earns 1 VP for each of its Scheme Markers within 6\" of the enemy Deployment Zone."],
                    2: [2, "Undercover Entourage", "This Scheme may not start revealed.<br />When you choose this Scheme, note down one of this Crew's Master or Henchman models. At the end of the game, if the chosen model is in the opponent's half of the table, this Crew earns 1 VP.<br />If the chosen model is in the enemy Deployment Zone at the end of the game, this Crew earns 1 additional VP.<br />If the chosen model is in the opponent's half of the table at the end of the game and has half or more of its Wounds remaining, this Crew earns 1 additional VP."],
                    3: [3, "Show of Force", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, count the number of face-up Upgrades with a printed cost greater than 0 attached to each non-Master model within 6\" of the center of the board for each Crew. Upgrades which began the game attached to a Master do not count toward this total.<br />If this Crew has at least one qualifying Upgrade and has a number of qualifying Upgrades equal to or exceeding the opposing Crew’s number of qualifying Upgrades, this crew scores 1VP."],
                    4: [4, "Hunting Party", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, score 1 VP if at least one enemy Minion or Peon model was killed by one of this Crew's Enforcer or Henchmen models.<br />At the end of every Turn after the first, if the enemy Crew has no Minion or Peon models in play, score 1 VP. No more than 1 VP per Turn may be scored from this Scheme."],
                    5: [5, "Hidden Trap", "This Scheme may not start revealed.<br />At the end of the game, this Crew earns 1 VP for each enemy non-Peon model within 3\" of one or morevfriendly Scheme Markers. Then, remove all of this Crew’s Scheme Markers which are within 3\" of an enemy model."],
                    6: [6, "Recover Evidence", "This Scheme may not start revealed.<br />You may reveal this Scheme at the beginning of any Turn. After revealing this Scheme, the opponent chooses five of their models in play (or all of their models in play if they have less then five remaining).<br />You may place an enemy Evidence Marker in base contact with chosen models.<br />Models in this Crew can use a (1) Interact Action to remove an enemy Evidence Marker in base contact with itself. If they do, this Crew scores 1 VP."],
                    7: [7, "Set Up", "This Scheme may not start revealed.<br />When you choose this Scheme, note down an enemy Master, Henchman, or Enforcer model.<br />Once per game, at the end of any Turn, this Crew may reveal this Scheme to score a number of VP equal to the number of this Crew's Scheme Markers within 4\" of the noted model.<br />Then remove all of this Crew's Scheme Markers within 4\" of the noted model."],
                    8: [8, "Search the Ruins", "This Scheme may not start revealed.<br />At the end of the game, this Crew earns 2 VP if it has 3 or more Scheme Markers within 6\" of the Center of the board.<br />If at least two of those Scheme Markers are on the opponent's half of the table, earn 1 additional VP.<br />Scheme Markers which are within 2\" of one or more other friendly Scheme Markers do not count towards this Scheme."],
                    9: [9, "Mark for Death", "This Scheme may not start revealed.<br />All non-Peon models in this Crew may target a non-Peon enemy model they are engaged with with a (1) Interact Action to give the target the following Condition for the rest of the game:<br />\"Marked: This condition may not be removed or ended.\"<br />Reveal this Scheme once an enemy model gains the Marked condition. When an enemy model with the Marked Condition is reduced to 0 Wounds or leaves play, gain 1 VP."],
                    10: [10, "Tail 'em", "This Scheme may not start revealed.<br />All Minion models in this Crew may target an enemy Master or Henchman model within 6\" and LoS with a (1) Interact Action to give the target the following Condition for the rest of the game:<br />Spotted: This Condition is removed if this model is outside of Line of Sight of all enemy models at the endof its Activation. No Action or Ability can remove thisCondition.<br />The first time an enemy model gains the Spotted Condition, reveal this Scheme. At the end of every Turn after the first, this Crew may end the Spotted Condition on one enemy model in play to gain 1 VP."],
                    11: [11, "Inspection", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, this Crew scores 1 VP if it has at least one non-Peon model within 4\" of where each end of the Centerline of the board meets the board edge (or corner)."],
                    12: [12, "A Quick Murder", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />When you choose this Scheme, note down the enemy model with the highest Soulstone Cost. If multiple models are tied for the highest Soulstone Cost, then choose one of those models and note it down.<br />This Crew earns 2 VP if the noted enemy model is killed or sacrificed before the end of the game.<br />If the noted enemy model is killed or sacrificed on or before Turn 3, earn 1 additional VP."],
                    13: [13, "Last Stand", "This Scheme may not start revealed. Reveal this Scheme at the end of any turn.<br />At the end of every Turn after the Turn this Scheme has been revealed, if this Crew has at least three Enforcer and/or Henchman (any combination of at least three) models in play completely outside their deployment zone and this Crew has fewer models on the table than the enemy Crew, score 1 VP."]
                }
                var pool = []
                var p0 = "always"
                if (s1 == s2) {
                    s2 = "doubles"
                    var vs = [v1, v2].sort(function(a, b) {
                        return a - b
                    })
                    pool = [s2, s1].concat(vs)
                }
                if (v1 == v2) {
                    v2 = "doubles"
                    var vs = [s1, s2].sort()
                    pool = vs.concat([v1])
                    pool.unshift(v2)
                } else {
                    var vs1 = [s1, s2].sort()
                    var vs2 = [v1, v2].sort(function(a, b) {
                        return a - b
                    })
                    pool = vs1.concat(vs2)
                }
                pool.unshift(p0)
                return [schemes[pool[1]], schemes[pool[2]], schemes[pool[3]], schemes[pool[4]], schemes[pool[0]]]
            }
