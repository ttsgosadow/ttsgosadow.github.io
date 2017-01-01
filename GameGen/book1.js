//GG17
            function getStrategyBook1(suit) {
                var strategy = {
                    bj: ["Stake a Claim", "<em>Special Rules</em><br />A model may take a (2) Interact Action to discard all Claim Markers within 6\" of itself, and then place a Claim Marker in base contact with itself.<br /><br /><em>Victory Points</em>At the end of each Turn after the first, a Crew earns 1 VP if there are more Claim Markers on the Enemy Half of the table than its own."],
                    rj: ["Stake a Claim", "<em>Special Rules</em><br />A model may take a (2) Interact Action to discard all Claim Markers within 6\" of itself, and then place a Claim Marker in base contact with itself.<br /><br /><em>Victory Points</em>At the end of each Turn after the first, a Crew earns 1 VP if there are more Claim Markers on the Enemy Half of the table than its own."],
                    c: ["Reckoning", "<em>Victory Points</em><br />At the end of every Turn, after the first, a Crew earns 1 VP if it killed or sacrificed two or more enemy models during that Turn.<br /><br />At the end of every Turn after the first, if a player has no models in play (buried models are not considered \"in play\") then her opponent earns 1 VP. A player may not earn more than 1 VP from this Strategy per Turn."],
                    m: ["Reconnoiter", "<em>Setup</em><br />Divide the table into four 18\" x 18\" table Quarters.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if it controls two or more table Quarters.<br /><br />To control a table quarter, the Crew must have the most non-Peon models within the table Quarter. These models cannot be within 6\" of the Center of the table, or partially within another table Quarter."],
                    r: ["Turf War", "<em>Setup</em><br />Place a single Turf Marker at the Center of the table.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if it has two or more non-Peon models within 6\" of the Turf Marker."],
                    t: ["Squatter's Rights", "<em>Setup</em><br />Place five 30mm Squat Markers along the Centerline. One is placed at the Center of the table. Then, two more are placed on the Centerline 6\" away from the Center of the table (one on each side). Lastly, two more are placed on the Centerline 6\" away from table's edge (one on each side).<br /><br /><em>Special Rules</em><br />Squat Markers begin the game claimed by neither Crew.<br />A model may take a (1) Interact Action to claim any Squat marker that is in base contact with the model.<br />A Squat marker is only ever claimed by the last Crew to interact with it, all previous claims are removed.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if it has claim to at least two Squat Markers."]
                }
                return strategy[suit]
            }
            function getSchemesBook1(s1, v1, s2, v2) {
                var schemes = {
                    always: ["always", "A Line in the Sand", ""],
                    doubles: ["doubles", "Distract", ""],
                    c: ["c", "Assassinate", ""],
                    m: ["m", "Breakthrough", ""],
                    r: ["r", "Bodyguard", ""],
                    t: ["t", "Protect Territory", ""],
                    1: [1, "Cursed Object", ""],
                    2: [2, "Outflank", ""],
                    3: [3, "Plant Evidence", ""],
                    4: [4, "Entourage", ""],
                    5: [5, "Vendetta", ""],
                    6: [6, "Plant Explosive", ""],
                    7: [7, "Make Them Suffer", ""],
                    8: [8, "Delivier a Message", ""],
                    9: [9, "Take Prisoner", ""],
                    10: [10, "Spring the Trap", ""],
                    11: [11, "Murder Protege", ""],
                    12: [12, "Frame for Murder", ""],
                    13: [13, "Power Ritual", ""]
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
