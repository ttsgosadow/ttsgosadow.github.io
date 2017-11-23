function togglediv(id) 
{
    var div = document.getElementById(id);
    if (document.getElementById(id + '-cb').checked)
        div.style.display = "block";
    else
        div.style.display = "none";
}

function toggleAll(bool) 
{
  if (bool)
      var toggleTo = "block"
  else
      var toggleTo = "none"
      document.getElementById("deployment-text-cb").checked = bool
  document.getElementById("strategy-text-cb").checked = bool
  document.getElementById("scheme1-text-cb").checked = bool
  document.getElementById("scheme2-text-cb").checked = bool
  document.getElementById("scheme3-text-cb").checked = bool
  document.getElementById("scheme4-text-cb").checked = bool
  document.getElementById("scheme5-text-cb").checked = bool
  document.getElementById("deployment-text").style.display = toggleTo
  document.getElementById("strategy-text").style.display = toggleTo
  document.getElementById("scheme1-text").style.display = toggleTo
  document.getElementById("scheme2-text").style.display = toggleTo
  document.getElementById("scheme3-text").style.display = toggleTo
  document.getElementById("scheme4-text").style.display = toggleTo
  document.getElementById("scheme5-text").style.display = toggleTo
}

function cardImage(p1) 
{
  if (p1["suit"] == "c" || p1["suit"] == "m" || p1["suit"] == "r" || p1["suit"] == "t")
      return p1["value"] + suitImage(p1["suit"])
  else if (p1["card"] == "bj")
      return "BJ"
  else if (p1["card"] == "rj")
      return "RJ"
  else
      return p1["card"]
}

function suitImage(p1) 
{
  var suitURLs = {
      c: "images/c.png",
      m: "images/m.png",
      r: "images/r.png",
      t: "images/t.png"
  }
  var altText = {
      c: "Crows",
      m: "Masks",
      r: "Rams",
      t: "Tomes"
  }
  if (p1 == "c" || p1 == "m" || p1 == "r" || p1 == "t")
      return "<img src=\"" + suitURLs[p1] + "\" alt=\"(" + altText[p1] + ")\" title=\"" + altText[p1] + "\" />"
  else
      return p1
}

